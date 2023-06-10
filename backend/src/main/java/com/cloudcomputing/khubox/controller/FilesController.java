package com.cloudcomputing.khubox.controller;

import com.cloudcomputing.khubox.config.AuthConfig;
import com.cloudcomputing.khubox.domain.LoginForm;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import com.cloudcomputing.khubox.service.FileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@CrossOrigin("*")
@RequestMapping("/files")
@Controller
@RequiredArgsConstructor
public class FilesController {

	private final FileService fileService;


	@GetMapping("/file")
	public ResponseEntity<List<String>> getFileList(HttpServletRequest request) {
		String folderName = (String) request.getSession().getAttribute("id");
		List<String> fileKeys = fileService.listBucketContents(folderName);

		return ResponseEntity.ok(fileKeys);
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
		return "redirect:http://localhost:3000/files/file";
	}

	@GetMapping("/download")
	public ResponseEntity<?> downloadFile(@RequestParam("fileKey") String fileKey,
	                                             HttpServletRequest request,
	                                             HttpServletResponse response) {
		log.info("download File key={}", fileKey);
		// 파일 다운로드 로직 추가
		fileService.download(fileKey, fileKey, request, response);

		// 파일이 존재하는 경우 다운로드 응답 반환
		return ResponseEntity.ok("Download Success");
	}

	@GetMapping("/update")
	public String updateFile(@RequestParam("fileKey") String fileKey, Model model) {

		model.addAttribute("fileKey", fileKey);

		return "files/update"; // 업데이트를 위한 뷰 페이지 이름 리턴
	}



	@PostMapping("/update")
	public ResponseEntity<String> handleUpdateFile(@RequestBody String requestBody) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(requestBody);

			String fileKey = jsonNode.get("fileKey").asText();
			String rename = jsonNode.get("rename").asText();

			log.info("Update File key={}, rename={}", fileKey, rename);

			// 파일 이름 변경 로직 추가
			fileService.rename(fileKey, rename);

			return ResponseEntity.ok("File renamed Success");
		} catch (Exception e) {
			// 처리 중 에러가 발생한 경우 예외 처리
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
		}
	}



}