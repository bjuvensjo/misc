package com.evry.service.payment.model;

public class Account {
	private String id;
	private double balance;

	public Account(String id, double balance) {
		super();
		this.id = id;
		this.balance = balance;
	}

	public String getId() {
		return id;
	}

	public double getBalance() {
		return balance;
	}
}
