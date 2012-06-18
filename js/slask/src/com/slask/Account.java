package com.slask;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Account {
	private String id;
	private double balance;

	public Account() {
		// TODO Auto-generated constructor stub
	}

	public Account(String id, double balance) {
		super();
		this.id = id;
		this.balance = balance;
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
