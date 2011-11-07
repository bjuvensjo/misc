package org.mbj.performance;

import java.util.Observable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Client extends Observable implements Runnable {
	private static Logger log = LoggerFactory.getLogger(Client.class);
	private String id;
	private Runnable runnable;
	private int nbOfExecutions;
	private long totalExecutionTime;
	private long minExecutionTime;
	private long maxExecutionTime;
	

	public Client(String id, Runnable runnable, int nbOfExecutions) {
		super();
		this.id = id;
		this.nbOfExecutions = nbOfExecutions;
		this.runnable = runnable;
		this.totalExecutionTime = 0;
		this.minExecutionTime = Long.MAX_VALUE;
		this.maxExecutionTime = Long.MIN_VALUE;
	}

	public String getId() {
		return id;
	}

	public int getNbOfExecutions() {
		return nbOfExecutions;
	}
	
	public long getTotalExecutionTime() {
    	return totalExecutionTime;
    }

	public long getMinExecutionTime() {
    	return minExecutionTime;
    }

	public long getMaxExecutionTime() {
    	return maxExecutionTime;
    }

	public void run() {
		for (int i = 0; i < nbOfExecutions; i++) {
			long executionTime = -System.currentTimeMillis();
			runnable.run();
			executionTime += System.currentTimeMillis();
			log.debug("Finished client {} execution {} in {} ms.", new Object[] {id, String.valueOf(i), executionTime});
			minExecutionTime = Math.min(minExecutionTime, executionTime);
			maxExecutionTime = Math.max(maxExecutionTime, executionTime);
			totalExecutionTime += executionTime;
		}
		log.debug("Finished client {} in {} ms.", id, totalExecutionTime);
		setChanged();
		notifyObservers();
	}
}
