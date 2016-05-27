package com.hevelian.identity.web.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/ui.svc")
public class UserInterfaceController {

	@RequestMapping(value="/template", method=RequestMethod.GET, produces="application/xml")
	@ResponseBody
	public String handleTemplate(HttpServletRequest request, @RequestParam(value="name", required=false) String templateName) 
			throws ParserConfigurationException, IOException {
		
		InputStream input = getResourceAsStream(request, templateName);
		StringBuffer sb = new StringBuffer();
		BufferedReader br = new BufferedReader(new InputStreamReader(input));
		for(String line; (line = br.readLine())!=null;) {
			sb.append(line);
		}
		br.close();
		
		// TODO: parse the template and validate against XACML engine

		return sb.toString();
	}
	
	/**
	 * Helper function to find a template file as a resource and return the input stream to it.
	 * @param request
	 * @param templateName
	 * @return
	 */
	private InputStream getResourceAsStream(HttpServletRequest request, String templateName) {
		String templatePath = "xml/" + templateName + ".xml";
		InputStream input = request.getServletContext().getResourceAsStream(templatePath);
		return input;
	}
}
