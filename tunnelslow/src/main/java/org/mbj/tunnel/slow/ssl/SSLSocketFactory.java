package org.mbj.tunnel.slow.ssl;

import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.security.SecureRandom;
import java.util.Locale;
import java.util.ResourceBundle;
import javax.net.SocketFactory;
import javax.net.ssl.SSLContext;


/**
 * SSLSocketFactory.
 *
 * @author   Magnus Bjuvensjö
 */
public class SSLSocketFactory extends javax.net.ssl.SSLSocketFactory {
    private static final String sClassName = SSLSocketFactory.class.getName();
    private static String SSL_CONTEXT;
    private static int SO_TIMEOUT;
    private javax.net.ssl.SSLSocketFactory factory;


    /*
     * Initialiserar klassens konstanter.
     * Defaultvärden används om ReourseBundle eller element saknas.
     */
    static {
        String ssl_context = null;
        String so_timeout = null;
        try {
            ResourceBundle res = ResourceBundle.getBundle(sClassName,
                    Locale.getDefault(), SSLSocketFactory.class.getClassLoader());
            ssl_context = res.getString("SSL_CONTEXT");
            so_timeout = res.getString("SO_TIMEOUT");
        } catch (Exception ex) {
            // Gör ingenting!
            // Defaultvärden sätts nedan.
        }
        SSL_CONTEXT = ssl_context != null
                      ? ssl_context
                      : "TLS";
        try {
            SO_TIMEOUT = Integer.parseInt(so_timeout);
        } catch (Exception ex) {
            SO_TIMEOUT = 8000;
        }
    }


    /**
     * Skapar SSLSocketFactory.
     */
    public SSLSocketFactory() {
        try {
            SSLContext sslcontext = SSLContext.getInstance(SSL_CONTEXT);
            // No KeyManager required
            sslcontext.init(null,
                            new TrustManager[] {new TrustManager()}
                            ,
                            new SecureRandom());
            factory
                    = (javax.net.ssl.SSLSocketFactory)sslcontext.
                      getSocketFactory();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }


    /**
     * Returnerar SocketFactory.
     *
     * @return  SocketFactory
     */
    public static SocketFactory getDefault() {
        return new SSLSocketFactory();
    }


    /**
     * Returnerar Socket.
     *
     * @param   socket Socket
     * @param   s String
     * @param   i int
     * @param   flag boolean
     * @return  Socket
     * @throws  IOException
     */
    public Socket createSocket(Socket socket, String s, int i, boolean flag) throws
            IOException {
        Socket result = factory.createSocket(socket, s, i, flag);
        result.setSoTimeout(SO_TIMEOUT);
        return result;
    }


    /**
     * Returnerar Socket.
     *
     * @param   inaddr InetAddress
     * @param   i int
     * @param   inaddr1 InetAddress
     * @param   j int
     * @return  Socket
     * @throws  IOException
     */
    public Socket createSocket(InetAddress inaddr, int i, InetAddress inaddr1,
                               int j) throws IOException {
        Socket result = factory.createSocket(inaddr, i, inaddr1, j);
        result.setSoTimeout(SO_TIMEOUT);
        return result;
    }


    /**
     * Returnerar Socket.
     *
     * @param   inaddr InetAddress
     * @param   i int
     * @return  Socket
     * @throws  IOException
     */
    public Socket createSocket(InetAddress inaddr, int i) throws IOException {
        Socket result = factory.createSocket(inaddr, i);
        result.setSoTimeout(SO_TIMEOUT);
        return result;
    }


    /**
     * Returnerar Socket
     *
     * @param   s String
     * @param   i int
     * @param   inaddr InetAddress
     * @param   j int
     * @return  Socket
     * @throws  IOException
     */
    public Socket createSocket(String s, int i, InetAddress inaddr, int j) throws
            IOException {
        Socket result = factory.createSocket(s, i, inaddr, j);
        result.setSoTimeout(SO_TIMEOUT);
        return result;
    }


    /**
     * Returnerar Socket.
     *
     * @param   s String
     * @param   i int
     * @return  Socket
     * @throws IOException
     */
    public Socket createSocket(String s, int i) throws IOException {
        Socket result = factory.createSocket(s, i);
        result.setSoTimeout(SO_TIMEOUT);
        return result;
    }


    /**
     * Returnerar default CipherSuites.
     *
     * @return  default CipherSuites
     */
    public String[] getDefaultCipherSuites() {
        return factory.getSupportedCipherSuites();
    }


    /**
     * Returnerar supported CipherSuites
     *
     * @return supported CipherSuites
     */
    public String[] getSupportedCipherSuites() {
        return factory.getSupportedCipherSuites();
    }
}
