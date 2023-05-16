package com.cloudcomputing.khubox.controller;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.LoginForm;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequestMapping("/files")
@Controller
@RequiredArgsConstructor
public class FilesController {

	private final FileService fileService;


	@GetMapping("/file")
	public String file(Model model) {
		List<String> fileKeys = fileService.listBucketContents();
		model.addAttribute("fileKeys", fileKeys);

		return "files/file";
	}

	@GetMapping("/upload")
	public String upload() {
		return "files/upload";
	}

	@GetMapping("/download")
	public String downloadFile(@RequestParam("fileKey") String fileKey,
							   HttpServletRequest request,
							   HttpServletResponse response
	) {
		log.info("download File key={}",fileKey);
		// 파일 다운로드 로직 추가
		fileService.download(fileKey, fileKey, request, response);
		return "files/file"; // 파일 다운로드 완료 후 이동할 뷰 이름
	}

	@GetMapping("/update")
	public String update(@RequestParam("fileKey") String fileKey) {
		log.info("update File key={}",fileKey);
		// 파일 다운로드 로직 추가
		fileService.rename(fileKey, fileKey+"update");
		return "files/file"; // 파일 다운로드 완료 후 이동할 뷰 이름
	}
}