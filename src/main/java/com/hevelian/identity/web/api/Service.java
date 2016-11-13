package com.hevelian.identity.web.api;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.logging.Level;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.hevelian.identity.client.ApiClient;
import com.hevelian.identity.client.ApiException;
import com.hevelian.identity.client.ApiResponse;
import com.hevelian.identity.client.api.TenantcontrollerApi;
import com.hevelian.identity.client.model.Tenant;
import com.hevelian.identity.client.model.TenantAdminRequestDTO;
import com.hevelian.identity.client.model.TenantRequestDTO;
import com.migcomponents.migbase64.Base64;

@Controller
@RequestMapping(path = "/Service")
public class Service {

    @RequestMapping(path = "/Test", method = RequestMethod.GET)
    @ResponseBody
	public String ServiceTest() throws ApiException, UnsupportedEncodingException {
    	String contentTypes[] = {};

		ApiClient client = new ApiClient();
		
		client.addDefaultHeader("Authorization", "Basic " + Base64.encodeToString("admin:admin".getBytes("UTF-8"), false));
		client.addDefaultHeader("Accept", "application/json");
		client.addDefaultHeader("Accept-Language", "en-US,en;q=0.5");
		client.addDefaultHeader("Content-Type", "application/json");

		client.setBasePath("http://localhost:8082/identity-server");
//		client.selectHeaderAccept(contentTypes);
		
		client.setDebugging(true);
		
		TenantRequestDTO tenant = new TenantRequestDTO();
		tenant.setDomain("someother2domain.com");
		tenant.setActive(true);
		tenant.setContactEmail("colin@4tune.net");
//		tenant.setAdminName("bob2by");
		
		TenantAdminRequestDTO tenantAdmin = new TenantAdminRequestDTO();
		tenantAdmin.setName("bob2by");
		tenantAdmin.setPassword("password");
		tenant.setTenantAdmin(tenantAdmin);
		
		System.out.println(new Gson().toJson(tenant));
		
		TenantcontrollerApi api = new TenantcontrollerApi(client);
//		api.addTenantUsingPOST(tenant);
		
		ApiResponse<List<Tenant>> x = api.getAllTenantsUsingGETWithHttpInfo();
		System.out.println(x.getHeaders());
		System.out.println(x);
		
		List<Tenant> tenants = api.getAllTenantsUsingGET();
		for(Tenant t: tenants) {
			System.out.println("Tenant: " + t.getDomain());
		}
		
		return("Finished Service Test");
	}
}
