package com.evry.loan;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/loan")
public class LoanResource {
	private LoanDAO dao = new LoanDAO();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Loan> findAll() {
		System.out.println("Loan findAll");
		return dao.findAll();
	}

	@GET @Path("search/{query}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Loan> findByName(@PathParam("query") String query) {
		System.out.println("Loan findByName: " + query);
		return dao.findByName(query);
	}

	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Loan findById(@PathParam("id") String id) {
		System.out.println("Loan findById " + id);
		return dao.findById(id);
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Loan create(Loan loan) {
	    System.out.println("Loan create " + loan.id);
		return dao.create(loan);
	}

	@PUT @Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Loan update(Loan loan) {
		System.out.println("Loan Updating loan: " + loan.id);
		dao.update(loan);
		return loan;
	}
	
	@DELETE @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") String id) {
	    System.out.println("Loan remove " + id);
		dao.remove(id);
	}
}
