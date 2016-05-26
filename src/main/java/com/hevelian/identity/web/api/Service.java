package com.hevelian.identity.web.api;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hevelian.identity.client.api.TenantcontrollerApi;
import com.hevelian.identity.client.model.Tenant;
import com.hevelian.identity.client.model.TenantRequestDTO;

import io.swagger.client.ApiClient;
import io.swagger.client.ApiException;
import io.swagger.client.auth.Authentication;
import io.swagger.client.auth.HttpBasicAuth;

@Controller
@RequestMapping(path = "/Service")
public class Service {

    @RequestMapping(path = "/Test", method = RequestMethod.GET)
    @ResponseBody
	public String ServiceTest() throws ApiException {
		
		ApiClient client = new ApiClient();
		
		// some DEBUG:
		Map<String, Authentication> map = client.getAuthentications();
		Set<Entry<String, Authentication>> set = map.entrySet();
		
		System.out.println("AUTH ENTRY SIZE: " + map.size());
		
		for(Entry<String, Authentication> e: set) {
			System.out.println("AUTH ENTRY SET NAME: " + e.getKey());
			Authentication auth = e.getValue();
		}
		// end DEBUG
		
		HttpBasicAuth basic = new HttpBasicAuth();
		map.put("basicAuth", basic);
		
		client.setUsername("admin");
		client.setPassword("admin");
		client.setBasePath("http://localhost:8082");
		
		TenantRequestDTO tenant = new TenantRequestDTO();
		tenant.setDomain("some_domain");
		
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		api.addTenantUsingPOST(tenant);
		
		List<Tenant> tenants = api.getAllTenantsUsingGET();
		for(Tenant t: tenants) {
			System.out.println("Tenant: " + t.getDomain());
		}
		
		return("Finished Service Test");
	}
}
