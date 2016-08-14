package com.hevelian.identity.web.tenant;

import java.io.UnsupportedEncodingException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.hevelian.identity.client.ApiException;
import com.hevelian.identity.client.model.Tenant;
import com.hevelian.identity.web.api.TenantController;
import com.hevelian.identity.web.session.SessionStore;

@Service
public class TenantService {
	private static final Logger logger = LogManager.getLogger(TenantController.class);
	private final TenantEngine tenantEngine;
	
	@Autowired
	private SessionStore sessionStore;
	
	@Autowired
	public TenantService(TenantEngine tenantEngine) {
		this.tenantEngine = tenantEngine;
	}

	public String getAllTenants() throws UnsupportedEncodingException, ApiException {
		logger.debug("TenantService: get all tenants");

		return new Gson().toJson(tenantEngine.getAllTenants(getAuthenticationString()));
	}
	
	public Tenant getTenant(String domain) throws UnsupportedEncodingException, ApiException {
		return tenantEngine.getTenant(getAuthenticationString(), domain);
	}
	
	public void addTenant(String domain, String username, String password) throws ApiException, UnsupportedEncodingException {
		tenantEngine.addTenant(domain, username, password);
	}
	
	/**
	 * getAuthenticationString
	 * Calculates the string used for basic auth with the Identity Server. If no tenant id is specified then
	 * we just use the username and password and assume it is a superuser admin.
	 * @return
	 */
	private String getAuthenticationString() {
		String tenantId = sessionStore.getProperty("tenantId");
		String username = sessionStore.getProperty("username");
		String password = sessionStore.getProperty("password");
		
		if(tenantId==null) {
			return username + ":" + password;
		}
		
		return username + "@" + tenantId + ":" + password;
	}
}
