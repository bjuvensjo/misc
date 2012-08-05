package com.evry.transfer;

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

@Path("/transfer")
public class TransferResource {
	private TransferDAO dao = new TransferDAO();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Transfer> findAll() {
		System.out.println("Transfer findAll");
		return dao.findAll();
	}

	@GET @Path("search/{query}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Transfer> findByName(@PathParam("query") String query) {
		System.out.println("Transfer findByName: " + query);
		return dao.findByName(query);
	}

	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Transfer findById(@PathParam("id") String id) {
		System.out.println("Transfer findById " + id);
		return dao.findById(id);
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Transfer create(Transfer transfer) {
	    System.out.println("Transfer create " + transfer.id);
		return dao.create(transfer);
	}

	@PUT @Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Transfer update(Transfer transfer) {
		System.out.println("Transfer Updating transfer: " + transfer.id);
		dao.update(transfer);
		return transfer;
	}
	
	@DELETE @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") String id) {
	    System.out.println("Transfer remove " + id);
		dao.remove(id);
	}
}
