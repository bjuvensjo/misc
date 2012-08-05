package com.evry.ui.payment.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Data {
	public List<Account> fromAccounts;
	public List<Account> toAccounts;
	public List<Transfer> unsignedTransfers;
	
	public Data() {
		super();
	}
	
	public Data(List<com.evry.service.payment.model.Account> fromAccounts, List<com.evry.service.payment.model.Account> toAccounts,
			List<com.evry.service.payment.model.Transfer> unsignedTransfers) {
		super();
		this.fromAccounts = new ArrayList<Account>();
		this.toAccounts = new ArrayList<Account>();
		this.unsignedTransfers = new ArrayList<Transfer>();
		for (com.evry.service.payment.model.Account account: fromAccounts) {
			this.fromAccounts.add(new Account(account));
		}
		for (com.evry.service.payment.model.Account account: fromAccounts) {
			this.toAccounts.add(new Account(account));
		}
		for (com.evry.service.payment.model.Transfer transfer : unsignedTransfers) {
			this.unsignedTransfers.add(new Transfer(transfer));
		}
	}
}
