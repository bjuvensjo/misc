package org.mbj.tunnel.slow.ssl;

import javax.net.ssl.SSLSession;

/**
 * HostnameVerifier är en javax.net.ssl.HostnameVerifier
 * som godkänner vilket Hostname som helst.
 * Den används för att slippa hantera certifikat.
 *
 * @author   Magnus Bjuvensjö
 */
public class HostnameVerifier implements javax.net.ssl.HostnameVerifier {

    /**
     * Skapar HostnameVerifier.
     */
    public HostnameVerifier() {
        super();
    }

    /**
     * Returnerar true.
     *
     * @param   parm1 String
     * @param   parm2 SSLSession
     * @return  true
     */
    public boolean verify(String parm1, SSLSession parm2) {
        return true;
    }
}
