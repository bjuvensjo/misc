package com.evry.ui.payment.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Account {
	private String id;
	private double balance;
	
	public Account() {
		super();
	}

	public Account(com.evry.service.payment.model.Account account) {
		super();
		this.id = account.getId();
		this.balance = account.getBalance();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}
}
