package com.evry.service.payment.model;

public class Transfer {
	private Account from;
	private Account to;
	private double amount;

	public Transfer(Account from, Account to, double amount) {
		super();
		this.from = from;
		this.to = to;
		this.amount = amount;
	}

	public Account getFrom() {
		return from;
	}

	public Account getTo() {
		return to;
	}

	public double getAmount() {
		return amount;
	}
}
