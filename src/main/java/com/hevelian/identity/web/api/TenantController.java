package com.hevelian.identity.web.api;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.hevelian.identity.web.tenant.TenantService;

import io.swagger.client.ApiException;

@Controller
@RequestMapping("/tenant.svc")
public class TenantController {
	private static final Logger logger = LogManager.getLogger(TenantController.class);
	private final TenantService tenantService;
	
	@Autowired
	public TenantController(TenantService tenantService) {
		this.tenantService = tenantService;
	}

	@RequestMapping(value="/tenant", method=RequestMethod.POST)
	public ResponseEntity<byte[]> addTenant(HttpServletRequest request) throws ApiException, UnsupportedEncodingException {
		logger.debug("TenantController: add new tenant");
		
		String frm_domain			= request.getParameter("frm_domain");
		String frm_username			= request.getParameter("frm_username");
		String frm_password			= request.getParameter("frm_password");

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(MediaType.APPLICATION_JSON_UTF8);
		
		tenantService.addTenant(frm_domain, frm_username, frm_password);
		return new ResponseEntity<byte[]>("OK".getBytes("UTF-8"), responseHeaders, HttpStatus.OK);
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public ResponseEntity<byte[]> getAllTenants(HttpServletRequest request) throws ParserConfigurationException, IOException, ApiException {
		logger.debug("TenantController: get all tenants");
		
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(MediaType.APPLICATION_JSON_UTF8);
		
		String tenants = tenantService.getAllTenants();
		return new ResponseEntity<byte[]>(tenants.getBytes("UTF-8"), responseHeaders, HttpStatus.OK);
	}
}
