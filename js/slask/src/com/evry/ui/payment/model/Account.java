package com.evry.ui.payment.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Account {
	public String id;
	public double balance;
	
	public Account() {
		super();
	}

	public Account(com.evry.service.payment.model.Account account) {
		super();
		this.id = account.getId();
		this.balance = account.getBalance();
	}
}
