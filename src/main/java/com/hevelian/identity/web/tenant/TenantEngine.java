package com.hevelian.identity.web.tenant;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.hevelian.identity.client.api.TenantcontrollerApi;
import com.hevelian.identity.client.model.Tenant;
import com.hevelian.identity.client.model.TenantDomainDTO;
import com.migcomponents.migbase64.Base64;

import io.swagger.client.ApiClient;
import io.swagger.client.ApiException;

@Component
@Scope("singleton")
public class TenantEngine {

	public List<Tenant> getAllTenants(String authentication) throws ApiException, UnsupportedEncodingException {
		ApiClient client = getApiClient();
		
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		return api.getAllTenantsUsingGET();
	}
	
	public Tenant getTenant(String authentication, String domain) throws ApiException, UnsupportedEncodingException {
		ApiClient client = getApiClient();
		TenantcontrollerApi api = new TenantcontrollerApi(client);
		
		TenantDomainDTO tenantDomainDTO = new TenantDomainDTO();
		tenantDomainDTO.setTenantDomain(domain);
		return api.getTenantUsingPOST(tenantDomainDTO);
	}
	
	private ApiClient getApiClient() throws UnsupportedEncodingException {
		ApiClient client = new ApiClient();
		
//		client.addDefaultHeader("Authorization", "Basic " + Base64.encodeToString(authentication.getBytes("UTF-8"), false));
		client.addDefaultHeader("Authorization", "Basic " + Base64.encodeToString("admin:admin".getBytes("UTF-8"), false));
		client.setBasePath("http://localhost:8082/identity-server");
		
		return client;
	}
}