package com.hevelian.identity.web.api;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hevelian.identity.client.ApiClient;
import com.hevelian.identity.client.ApiException;
import com.hevelian.identity.client.api.TenantcontrollerApi;
import com.hevelian.identity.client.model.Tenant;
import com.hevelian.identity.client.model.TenantRequestDTO;
import com.hevelian.identity.client.model.UserRequestDTO;
import com.migcomponents.migbase64.Base64;

@Controller
@RequestMapping(path = "/Service")
public class Service {

    @RequestMapping(path = "/Test", method = RequestMethod.GET)
    @ResponseBody
	public String ServiceTest() throws ApiException, UnsupportedEncodingException {
		
		ApiClient client = new ApiClient();
		
		client.addDefaultHeader("Authorization", "Basic " + Base64.encodeToString("admin:admin".getBytes("UTF-8"), false));
		client.setBasePath("http://localhost:8082/identity-server");
		
		TenantRequestDTO tenant = new TenantRequestDTO();
		tenant.setDomain("some_domain");
		tenant.setActive(true);
		
		UserRequestDTO tenantAdmin = new UserRequestDTO();
		tenantAdmin.setName("bob");
		tenantAdmin.setPassword("password");
		tenant.setTenantAdmin(tenantAdmin);
		
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		api.addTenantUsingPOST(tenant);
		
		List<Tenant> tenants = api.getAllTenantsUsingGET();
		for(Tenant t: tenants) {
			System.out.println("Tenant: " + t.getDomain());
		}
		
		return("Finished Service Test");
	}
}
