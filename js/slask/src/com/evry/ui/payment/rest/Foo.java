package com.evry.ui.payment.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.evry.service.payment.PaymentService;
import com.evry.ui.payment.model.Data;

@Path("/payment")
public class Foo {
	private PaymentService paymentService = new PaymentService();

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Data getData() {
		System.out.println("#######################");
		Data data = new Data(paymentService.getFromAccounts(), paymentService.getToAccounts(), paymentService.getUnsignedTransfers());
		return data;
	}
}
