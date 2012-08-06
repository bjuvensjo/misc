package com.evry.account;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

public class AccountDAO {
    //private static final String ACCOUNT_JSON = "/slask/account.json";
    private static final List<Account> accounts = new ArrayList<Account>();
    static {
        accounts.add(new Account("12345678901", "Privatkonto", Math.random() * 50000));
        accounts.add(new Account("23456789012", "Lånekonto", Math.random() * 20000));
        accounts.add(new Account("34567890123", "Räkningskonto", Math.random() * 50000));
        accounts.add(new Account("45678901234", "Semesterkonto", Math.random() * 100000));
        accounts.add(new Account("56789012345", "Sparkonto", 100000 + (Math.random() * 1000000)));
        /*
    	try {            
            List<Account> accounts = new ArrayList<Account>();
            accounts.add(new Account("12345678901", "Privatkonto", Math.random() * 50000));
            accounts.add(new Account("23456789012", "Lånekonto", Math.random() * 20000));
            accounts.add(new Account("34567890123", "Räkningskonto", Math.random() * 50000));
            accounts.add(new Account("45678901234", "Semesterkonto", Math.random() * 100000));
            accounts.add(new Account("56789012345", "Sparkonto", 100000 + (Math.random() * 1000000)));
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(new File(ACCOUNT_JSON), accounts);
        } catch (Exception e) {
            e.printStackTrace(System.err);
        }
        */
    }

    public List<Account> findAll() {
    	/*
        List<Account> accounts = null;
        // 2. Convert JSON to Java object
        try {
            ObjectMapper mapper = new ObjectMapper();
            accounts = mapper.readValue(new File(ACCOUNT_JSON), new TypeReference<List<Account>>() { });
        } catch (Exception e) {
            e.printStackTrace(System.err);
        }
        */
        return accounts;
    }

    public List<Account> findByName(String name) {
        return null;
    }

    public Account findById(String id) {
        List<Account> accounts = findAll();
        for (Account account : accounts) {
            if (account.id.equals(id)) {
                return account;
            }
        }
        return null;
    }

    public Account save(Account account) {
        return null;
    }

    public Account create(Account account) {
        return null;
    }

    public Account update(Account account) {
        return null;
    }

    public boolean remove(String id) {
        return false;
    }
}
