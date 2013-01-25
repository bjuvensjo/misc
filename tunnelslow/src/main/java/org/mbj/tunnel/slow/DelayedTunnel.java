package org.mbj.tunnel.slow;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;

import org.mbj.tunnel.slow.ssl.SSLSocketFactory;

/**
 * DelayedTunnel.
 * 
 * @author Magnus Bjuvensjö
 * @version 1.0
 */
public class DelayedTunnel {
	private int listenPort;
	private boolean https;
	private String tunnelHost;
	private int tunnelPort;
	private int clientDelay;
	private int serverDelay;
	private String encoding;

	private PrintStream ps;
	private ServerSocket ss;
	private boolean shutdown;

	public DelayedTunnel(int listenPort, boolean https, String tunnelHost,
			int tunnelPort, int clientDelay, int serverDelay, String encoding) {
		super();
		this.listenPort = listenPort;
		this.https = https;
		this.tunnelHost = tunnelHost;
		this.tunnelPort = tunnelPort;
		this.clientDelay = clientDelay;
		this.serverDelay = serverDelay;
		this.encoding = encoding;
		this.ps = System.out;
		this.ss = null;
		this.shutdown = false;
	}

	/**
	 * Startar denna SSLProxy. Om tidigare startad, händer inget.
	 */
	public void start() {
		shutdown = false;

		// Kör SSLProxy i egen tråd.
		Thread server = new Thread() {
			public void run() {
				try {
					// Skapa ServerSocket.
					ss = new ServerSocket(listenPort);
				} catch (Exception e) {
					e.printStackTrace();
				}
				// Så länge som ingen annan tråd anropat shutdown().
				while (!shutdown) {
					try {
						// Acceptera uppkoppling från klient och erhåll Socket
						// mot klient.
						Socket sc = ss.accept();
						// Skapa socket mot server.
						Socket st = https ? SSLSocketFactory.getDefault()
								.createSocket(tunnelHost, tunnelPort)
								: new Socket(tunnelHost, tunnelPort);
						// Läs från klient och skriv till server.
						new Relay(sc.getInputStream(), st.getOutputStream(),
								ps, clientDelay, encoding).start();
						// Läs från server och skriv till klient.
						new Relay(st.getInputStream(), sc.getOutputStream(),
								ps, serverDelay, encoding).start();
					} catch (Exception ee) {
						// Vi hamnar alltid här om någon anropat shutdown(),
						// men det är OK.
						ee.printStackTrace();
					}
				}
			}
		};
		server.start();
	}

	/**
	 * Stänger ner denna SSLProxy. Om tidigare nedstängd, händer inget.
	 */
	public void shutdown() {
		shutdown = true;
		try {
			ss.close();
		} catch (Exception ex) {
			// Gör ingenting.
		}
	}

	private static class Relay extends Thread {
		final static int BUFSIZ = 1000;
		private InputStream in;
		private OutputStream out;
		private PrintStream ps;
		private byte buf[] = new byte[BUFSIZ];
		private int delay;
		private String encoding;

		Relay(InputStream in, OutputStream out, PrintStream ps, int delay,
				String encoding) {
			this.in = in;
			this.out = out;
			this.ps = ps;
			this.delay = delay;
			this.encoding = encoding;
		}

		public void run() {
			int n;
			try {
				// Så länge som vi har något att läsa från in,
				// skriv det till out.
				while ((n = in.read(buf)) > 0) {
					try {
						Thread.sleep(delay);
					} catch (Exception ex) {

					}
					String s = new String(buf, 0, n, encoding);
					out.write(s.getBytes());
					// out.write(buf, 0, n);
					out.flush();
					if (ps != null) {
						ps.print(new String(buf, 0, n));
					}
				}
				if (ps != null) {
					ps.println();
				}
			} catch (IOException e) {
			} finally {
				try {
					in.close();
					out.close();
				} catch (IOException e) {
				}
			}
		}
	}

	public static void main(String[] args) throws Exception {
		int listenPort = Integer.parseInt(args[0]);
		boolean https = !"false".equals(args[1]);
		String tunnelHost = args[2];
		int tunnelPort = Integer.parseInt(args[3]);
		int clientDelay = Integer.parseInt(args[4]);
		int serverDelay = Integer.parseInt(args[5]);
		String encoding = args[6];
		
		DelayedTunnel delayedTunnel = new DelayedTunnel(listenPort, https, tunnelHost, tunnelPort, clientDelay, serverDelay, encoding);
		delayedTunnel.start();

		System.out.println("DelayedTunnel started:");
		System.out.println("\tlistenPort: " + listenPort);
		System.out.println("\thttps: " + https);
		System.out.println("\ttunnelHost: " + tunnelHost);
		System.out.println("\ttunnelPort: " + tunnelPort);
		System.out.println("\tclientDelay: " + clientDelay);
		System.out.println("\tserverDelay: " + serverDelay);
		System.out.println("\tencoding: " + encoding);
	}
}
