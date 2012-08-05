package com.evry.ui.payment.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Transfer {
	public Account from;
	public Account to;
	public double amount;

	public Transfer() {
		super();
	}

	public Transfer(com.evry.service.payment.model.Transfer transfer) {
		super();
		this.from = new Account(transfer.getFrom());
		this.to = new Account(transfer.getTo());
		this.amount = transfer.getAmount();
	}
}
