package com.hevelian.identity.web.api;

import java.util.List;

import com.hevelian.identity.client.api.TenantcontrollerApi;
import com.hevelian.identity.client.model.Tenant;
import com.hevelian.identity.client.model.TenantRequestDTO;

import io.swagger.client.ApiClient;
import io.swagger.client.ApiException;

public class Service {

	public Service() throws ApiException {
		
		ApiClient client = new ApiClient();
		client.setUsername("admin");
		client.setPassword("admin");
		client.setBasePath("http://localhost:8082");
		
		TenantRequestDTO tenant = new TenantRequestDTO();
		tenant.setDomain("some_domain");
		
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		api.addTenantUsingPOST(tenant);
		
		/* now get the list of all the tenants to see if it was added */
		List<Tenant> tenants = api.getAllTenantsUsingGET();
		for(Tenant t: tenants) {
			System.out.println("Tenant: " + t.getDomain());
		}
	}
}
