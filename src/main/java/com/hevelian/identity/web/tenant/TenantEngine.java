package com.hevelian.identity.web.tenant;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.hevelian.identity.client.ApiClient;
import com.hevelian.identity.client.ApiException;
import com.hevelian.identity.client.api.TenantcontrollerApi;
import com.hevelian.identity.client.model.Tenant;
import com.hevelian.identity.client.model.TenantAdminRequestDTO;
import com.hevelian.identity.client.model.TenantDomainDTO;
import com.hevelian.identity.client.model.TenantRequestDTO;
import com.migcomponents.migbase64.Base64;

@Component
@Scope("singleton")
public class TenantEngine {

	String basicAcceptHeader[] = {"*/*"};
	String acceptHeader[] = {"application/json"};
	String contentTypes[] = {};
	
	public List<Tenant> getAllTenants(String authentication) throws ApiException, UnsupportedEncodingException {
		ApiClient client = getApiClient();
		
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		List<Tenant> tenants = null;
		try {
			tenants = api.getAllTenantsUsingGET();
		} catch(ApiException e) {
			System.out.println(e.getResponseBody());
		}
		
		return tenants;
	}
	
	public Tenant getTenant(String authentication, String domain) throws ApiException, UnsupportedEncodingException {
		ApiClient client = getApiClient();
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		
		TenantDomainDTO tenantDomainDTO = new TenantDomainDTO();
		tenantDomainDTO.setTenantDomain(domain);
		return api.getTenantUsingPOST(tenantDomainDTO);
	}
	
	public void addTenant(String domain, String username, String password) throws ApiException, UnsupportedEncodingException {
		ApiClient client = getApiClient();

		TenantRequestDTO tenant = new TenantRequestDTO();
		tenant.setDomain(domain);
		tenant.setActive(true);
		tenant.setContactEmail("colin@4tune.net");
		
		TenantAdminRequestDTO tenantAdmin = new TenantAdminRequestDTO();
		tenantAdmin.setName(username);
		tenantAdmin.setPassword(password);
		tenant.setTenantAdmin(tenantAdmin);
		
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		api.addTenantUsingPOST(tenant);
	
	}
	
	private ApiClient getApiClient() throws UnsupportedEncodingException {
		ApiClient client = new ApiClient();
		
//		client.addDefaultHeader("Authorization", "Basic " + Base64.encodeToString(authentication.getBytes("UTF-8"), false));
		client.addDefaultHeader("Authorization", "Basic " + Base64.encodeToString("admin:admin".getBytes("UTF-8"), false));
		client.addDefaultHeader("Accept", "application/json");
		client.setBasePath("http://localhost:8082/identity-server");
		
		System.out.println("SET API CLIENT PARAMETERS TO ACCEPT");
		return client;
	}
}
