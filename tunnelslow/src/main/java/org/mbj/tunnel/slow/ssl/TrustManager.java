package org.mbj.tunnel.slow.ssl;

import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;

/**
 * TrustManager är en javax.net.ssl.X509TrustManager
 * som godkänner vilket certifikat som helst.
 * Den används för att slippa hantera certifikat.
 *
 * @author   Magnus Bjuvensjö
 */
public class TrustManager implements X509TrustManager {

    /**
     * Returnerar en tom array av X509Certificate.
     *
     * @return  en tom array av X509Certificate
     */
    public X509Certificate[] getAcceptedIssuers() {
        return new X509Certificate[0];
    }

    /**
     *
     * @param chain X509Certificate[]
     * @param authType String
     */
    public void checkClientTrusted(X509Certificate[] chain,
                                   String authType) {
    }

    /**
     *
     * @param chain X509Certificate[]
     * @param authType String
     */
    public void checkServerTrusted(X509Certificate[] chain,
                                   String authType) {
    }
}
