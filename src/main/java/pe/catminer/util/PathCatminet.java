package pe.catminer.util;

import javax.servlet.http.HttpServletRequest;

public class PathCatminet {
	
	public static String obtenerContext(HttpServletRequest request) {
		
		String scheme = request.getScheme();
		String serverName = request.getServerName();
		int serverPort = request.getServerPort();
		String contextPath = request.getContextPath();  

		String resultPath = scheme + "://" + serverName + ":" + serverPort + contextPath;
		return resultPath;
	}

}
