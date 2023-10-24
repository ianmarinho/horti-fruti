import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.io.IOException;

@WebServlet(name = "EnviarEmailServlet", urlPatterns = {"/EnviarEmailServlet"})
public class EnviarEmailServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            // Configurar as propriedades do servidor de e-mail
            Properties properties = new Properties();
            properties.put("mail.smtp.host", "smtp.seu-servidor-de-email.com");
            properties.put("mail.smtp.port", "587");
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.starttls.enable", "true");

            // Configurar as informações de autenticação do remetente
            String remetenteEmail = "seu_email@dominio.com";
            String senhaEmail = "sua_senha_de_email";

            // Configurar a sessão de e-mail
            Session session = Session.getInstance(properties, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(remetenteEmail, senhaEmail);
                }
            });

            // Recuperar os dados do formulário
            String nome = request.getParameter("nome");
            String email = request.getParameter("email");
            String contato = request.getParameter("contato");
            String assunto = request.getParameter("assunto");
            String mensagem = request.getParameter("mensagem");

            // Construir a mensagem de e-mail
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(remetenteEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("iansilvamarinho593@gmail.com")); // Adicione o novo destinatário
            message.setSubject("Mensagem do formulário de contato: " + assunto);
            message.setText("Nome: " + nome + "\nEmail: " + email + "\nContato: " + contato + "\nMensagem:\n" + mensagem);

            // Enviar o e-mail
            Transport.send(message);

            // Redirecionar de volta para a página do formulário após o envio
            response.sendRedirect(request.getHeader("Referer")); // Isso redirecionará de volta para a página anterior
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("erro.html"); // Página de erro em caso de falha no envio
        }
    }
}
