package com.evry.loan;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Loan {
    public String id;
    public String name;
    public double balance;
    
    public Loan() {
    }

    public Loan(String id, String name, double balance) {
        super();
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
}
