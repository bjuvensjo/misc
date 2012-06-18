package com.slask;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/foo")
public class Foo {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Account> getAccounts() {
		System.out.println("#######################");
		List<Account> accounts = new ArrayList<Account>();
		for (int i = 0; i < 10; i++) {
			accounts.add(new Account(String.valueOf(i), i + 1000));
		}
		return accounts;
	}
}
