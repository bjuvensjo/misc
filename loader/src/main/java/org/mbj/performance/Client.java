package org.mbj.performance;

import java.util.Observable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Client extends Observable implements Runnable {
	private static Logger log = LoggerFactory.getLogger(Client.class);
	private String id;
	private Runnable runnable;
	private int nbOfExecutions;
	private long min;
	private long max;
	

	public Client(String id, Runnable runnable, int nbOfExecutions) {
		super();
		this.id = id;
		this.nbOfExecutions = nbOfExecutions;
		this.runnable = runnable;
		this.min = Long.MAX_VALUE;
		this.max = Long.MIN_VALUE;
	}

	public String getId() {
		return id;
	}

	public int getNbOfExecutions() {
		return nbOfExecutions;
	}
	
	public long getMin() {
    	return min;
    }

	public long getMax() {
    	return max;
    }

	public void run() {
		//long time = -System.currentTimeMillis();
		long totalTime = 0;
		for (int i = 0; i < nbOfExecutions; i++) {
			long time = -System.currentTimeMillis();
			runnable.run();
			time += System.currentTimeMillis();
			log.debug("Finished client {} execution {} in {} ms.", new Object[] {id, String.valueOf(i), time});
			min = Math.min(min, time);
			max = Math.max(max, time);
			totalTime += time;
		}
		//time += System.currentTimeMillis();
		log.info("Finished client {} in {} ms.", id, totalTime);
		setChanged();
		notifyObservers(totalTime);
	}
}
