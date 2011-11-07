package org.mbj.performance;

import java.util.Observable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Client extends Observable implements Runnable {
	private static Logger log = LoggerFactory.getLogger(Client.class);
	private String id;
	private Runnable runnable;
	private int nbOfExecutions;
	

	public Client(String id, Runnable runnable, int nbOfExecutions) {
		super();
		this.id = id;
		this.nbOfExecutions = nbOfExecutions;
		this.runnable = runnable;
	}

	public String getId() {
		return id;
	}

	public int getNbOfExecutions() {
		return nbOfExecutions;
	}

	public void run() {
		long time = -System.currentTimeMillis();
		for (int i = 0; i < nbOfExecutions; i++) {
			runnable.run();
		}
		time += System.currentTimeMillis();
		log.debug("Finished client {} in {} ms.", id, time);
		setChanged();
		notifyObservers(time);
	}
}
