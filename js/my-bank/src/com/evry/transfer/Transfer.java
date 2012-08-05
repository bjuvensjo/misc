package com.evry.transfer;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import com.evry.account.Account;

@XmlRootElement
public class Transfer {
    public String id;
    public Account from;
    public Account to;
    public double amount;
    public Date date;
    
    public Transfer() {
    }

    public Transfer(String id, Account from, Account to, double amount, Date date) {
        super();
        this.id = id;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.date = date;
    }
}
