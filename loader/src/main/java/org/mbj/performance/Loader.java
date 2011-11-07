package org.mbj.performance;

import java.util.List;
import java.util.Observable;
import java.util.Observer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Loader implements Observer {
	private static Logger log = LoggerFactory.getLogger(Loader.class);
	private List<Client> clients;
	private int countDown;
	private long totalTime;
	private long totalClientExecutionTime;
	private long totalNbOfExecutions;
	private long minExecutionTime;
	private long maxExecutionTime;	

	public Loader(List<Client> clients) {
		super();
		this.clients = clients;
		this.countDown = clients.size();
		this.totalTime = 0;
		this.totalClientExecutionTime = 0;
		this.totalNbOfExecutions = 0;
		this.minExecutionTime = Long.MAX_VALUE;
		this.maxExecutionTime = Long.MIN_VALUE;		
	}

	public long getTotalTime() {
		return totalTime;
	}

	public void start() {
		for (Client client : clients) {
			client.addObserver(this);
		}
		totalTime = -System.currentTimeMillis();
		for (Client client : clients) {
			new Thread(client).start();
			log.info("Started client {}", client.getId());
		}
		synchronized (this) {
			while (countDown > 0) {
				try {
					this.wait();
				} catch (InterruptedException e) {
					log.error("", e);
				}
			}
		}
		totalTime += System.currentTimeMillis();
		log.info("Total time: {} ms.", totalTime);
		log.info("Total client execution time: {} ms.", totalClientExecutionTime);
		log.info("Total number of executions: {}.", totalNbOfExecutions);
		log.info("Average time/execution: {} ms.", (((double)totalClientExecutionTime) / ((double)totalNbOfExecutions)));
		log.info("Min time/execution: {} ms.", minExecutionTime);
		log.info("Max time/execution: {} ms.", maxExecutionTime);
		log.info("Average executions/s: {}.", (((double)totalNbOfExecutions) / ((double)totalTime)) * 1000);
	}

	public void update(Observable observable, Object time) {
		synchronized (this) {
			Client client = (Client)observable;
			log.info("Finished client {} in {} ms.", client.getId(), client.getTotalExecutionTime());
			minExecutionTime = Math.min(minExecutionTime, client.getMinExecutionTime());
			maxExecutionTime = Math.max(maxExecutionTime, client.getMaxExecutionTime());			
			totalClientExecutionTime += client.getTotalExecutionTime();
			totalNbOfExecutions += client.getNbOfExecutions();
			countDown--;
			this.notifyAll();
		}
	}
}