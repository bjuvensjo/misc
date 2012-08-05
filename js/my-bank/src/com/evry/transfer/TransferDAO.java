package com.evry.transfer;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.evry.account.Account;
import com.evry.account.AccountDAO;

public class TransferDAO {
    private static final String TRANSFER_JSON = "/slask/transfer.json";
    static {
        try {
            List<Account> accounts = new AccountDAO().findAll();
            List<Transfer> transfers = new ArrayList<Transfer>();            
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
            for (int i = 0; i < 20; i++) {
                int fromIndex = (int)(Math.random() * accounts.size());
                int toIndex = fromIndex;
                // Assumes accounts.size() > 1 !!!!!!!!!!
                while (toIndex == fromIndex) {
                    toIndex = (int)(Math.random() * accounts.size());
                }
                Date date = df.parse("2012070" +  ((int)(Math.random() * 9 + 1)));
                Transfer transfer = new Transfer(String.valueOf(i), accounts.get(fromIndex), accounts.get(toIndex), 50 + Math.random() * Math.pow(10, 1 + i % 5), date );
                transfers.add(transfer);
            }
            // 1. Convert Java object to JSON format
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(new File(TRANSFER_JSON), transfers);
        } catch (Exception e) {
            e.printStackTrace(System.err);
        }
    }

    public List<Transfer> findAll() {
        List<Transfer> transfers = null;
        // 2. Convert JSON to Java object
        try {
            ObjectMapper mapper = new ObjectMapper();
            transfers = mapper.readValue(new File(TRANSFER_JSON), new TypeReference<List<Transfer>>() { });
        } catch (Exception e) {
            e.printStackTrace(System.err);
        }
        return transfers;
    }

    public List<Transfer> findByName(String name) {
        return null;
    }

    public Transfer findById(String id) {
        List<Transfer> transfers = findAll();
        for (Transfer transfer : transfers) {
            if (transfer.id.equals(id)) {
                return transfer;
            }
        }
        return null;
    }

    public Transfer save(Transfer transfer) {
        return null;
    }

    public Transfer create(Transfer transfer) {
        return null;
    }

    public Transfer update(Transfer transfer) {
        return null;
    }

    public boolean remove(String id) {
        return false;
    }
    
    public static void main(String[] args) throws Exception {
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        System.out.println(df.parse("2012070" +  ((int)(Math.random() * 10))));
    }
}
