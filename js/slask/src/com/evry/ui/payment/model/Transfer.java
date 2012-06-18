package com.evry.ui.payment.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Transfer {
	private Account from;
	private Account to;
	private double amount;

	public Transfer() {
		super();
	}

	public Transfer(com.evry.service.payment.model.Transfer transfer) {
		super();
		this.from = new Account(transfer.getFrom());
		this.to = new Account(transfer.getTo());
		this.amount = transfer.getAmount();
	}

	public Account getFrom() {
		return from;
	}

	public void setFrom(Account from) {
		this.from = from;
	}

	public Account getTo() {
		return to;
	}

	public void setTo(Account to) {
		this.to = to;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
}
