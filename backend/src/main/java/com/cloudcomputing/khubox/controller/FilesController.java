package com.cloudcomputing.khubox.controller;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.LoginForm;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import com.cloudcomputing.khubox.service.FileService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@CrossOrigin("*")
@RequestMapping("/files")
@Controller
@RequiredArgsConstructor
public class FilesController {

	private final FileService fileService;


	@GetMapping("/file")
	public String file(Model model, HttpServletRequest request) {
		String folderName = (String) request.getSession().getAttribute("id"); // 세션에서 로그인 아이디 가져오기
		List<String> fileKeys = fileService.listBucketContents(folderName);
		model.addAttribute("fileKeys", fileKeys);

		return "files/file";
	}

	@GetMapping("/upload")
	public String upload() {
		return "files/upload";
	}

	@PostMapping("/upload")
	public String uploadFile(@RequestParam("file") MultipartFile file, HttpServletRequest request){
		String folderName = (String) request.getSession().getAttribute("id"); // 세션에서 로그인 아이디 가져오기
		fileService.uploadToAWS(folderName, file);
		log.info("upload File={}", file);
		return "redirect:/files/file";
	}

	@GetMapping("/download")
	public String downloadFile(@RequestParam("fileKey") String fileKey,
							   HttpServletRequest request,
							   HttpServletResponse response
	) {
		log.info("download File key={}",fileKey);
		// 파일 다운로드 로직 추가
		fileService.download(fileKey, fileKey, request, response);
		return "files/file";
	}

	@GetMapping("/update")
	public String updateFile(@RequestParam("fileKey") String fileKey, Model model) {

		model.addAttribute("fileKey", fileKey);

		return "files/update"; // 업데이트를 위한 뷰 페이지 이름 리턴
	}


	@PostMapping("/update")
	public String handleUpdateFile(@RequestParam("fileKey") String fileKey, @RequestParam("rename") String rename) {
		log.info("Update File key={}", fileKey);

		// 파일 이름 변경 로직 추가
		fileService.rename(fileKey, rename);
		return "redirect:/files/file";
	}

}