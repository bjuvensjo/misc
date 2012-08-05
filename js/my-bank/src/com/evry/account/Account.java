package com.evry.account;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Account {
    public String id;
    public String name;
    public double balance;
    
    public Account() {
    }

    public Account(String id, String name, double balance) {
        super();
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
}
