package com.evry.service.payment;

import java.util.ArrayList;
import java.util.List;

import com.evry.service.payment.model.Account;
import com.evry.service.payment.model.Transfer;

public class PaymentService {
	
	public List<Account> getFromAccounts() {
		List<Account> accounts = new ArrayList<Account>();
		for (int i = 0; i < 10; i++) {
			accounts.add(new Account(String.valueOf(i), i + 1000));
		}
		return accounts;
	}
	
	public List<Account> getToAccounts() {
		List<Account> accounts = new ArrayList<Account>();
		for (int i = 0; i < 10; i++) {
			accounts.add(new Account(String.valueOf(i), i + 1000));
		}
		return accounts;
	}
	
	public List<Transfer> getUnsignedTransfers() {
		List<Transfer> transfers = new ArrayList<Transfer>();
		for (int i = 0; i < 10; i++) {
			int fromIndex = (int)(Math.random() * 10);
			int toIndex = (int)(Math.random() * 10);
			transfers.add(new Transfer(getFromAccounts().get(fromIndex), getToAccounts().get(toIndex), i + 1000));
		}
		return transfers;
	}
}
