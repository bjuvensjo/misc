package org.mbj.performance;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

public class LoaderTest {
	private static final int nbOfClients = 10;
	private static final int nbOfExecutions = 10;
	private List<Client> clients;

	@Before
	public void init() {
		Runnable runnable = new Runnable() {
			public void run() {
				try {
					Thread.sleep(100);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		};
		clients = new ArrayList<Client>();
		for (int i = 0; i < nbOfClients; i++) {
			clients.add(new Client(String.valueOf(i), runnable, nbOfExecutions));
		}
	}
	
	@Test
	public void testLoader() {
		Loader loader = new Loader(clients);
		loader.start();
	}
}
