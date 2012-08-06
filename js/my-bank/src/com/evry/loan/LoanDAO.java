package com.evry.loan;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

public class LoanDAO {
    //private static final String LOAN_JSON = "/slask/loan.json";
	private static final List<Loan> loans = new ArrayList<Loan>();
    static {
        loans.add(new Loan("12345678901", "Bolån", 400000 + Math.random() * 1000000));
        loans.add(new Loan("23456789012", "Billån", 100000 + Math.random() * 200000));
        loans.add(new Loan("34567890123", "MC-lån", 30000 + Math.random() * 50000));
        /*
    	try {            
            List<Loan> loans = new ArrayList<Loan>();
            loans.add(new Loan("12345678901", "Bolån", 400000 + Math.random() * 1000000));
            loans.add(new Loan("23456789012", "Billån", 100000 + Math.random() * 200000));
            loans.add(new Loan("34567890123", "MC-lån", 30000 + Math.random() * 50000));
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(new File(LOAN_JSON), loans);
        } catch (Exception e) {
            e.printStackTrace(System.err);
        }
        */
    }

    public List<Loan> findAll() {
    	/*
        List<Loan> loans = null;
        // 2. Convert JSON to Java object
        try {
            ObjectMapper mapper = new ObjectMapper();
            loans = mapper.readValue(new File(LOAN_JSON), new TypeReference<List<Loan>>() { });
        } catch (Exception e) {
            e.printStackTrace(System.err);
        }
        */
        return loans;
    }

    public List<Loan> findByName(String name) {
        return null;
    }

    public Loan findById(String id) {
        List<Loan> loans = findAll();
        for (Loan loan : loans) {
            if (loan.id.equals(id)) {
                return loan;
            }
        }
        return null;
    }

    public Loan save(Loan loan) {
        return null;
    }

    public Loan create(Loan loan) {
        return null;
    }

    public Loan update(Loan loan) {
        return null;
    }

    public boolean remove(String id) {
        return false;
    }
}
