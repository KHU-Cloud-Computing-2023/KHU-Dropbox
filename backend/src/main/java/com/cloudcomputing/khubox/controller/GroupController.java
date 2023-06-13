package com.cloudcomputing.khubox.controller;

import com.cloudcomputing.khubox.domain.Group;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import com.cloudcomputing.khubox.service.FileService;
import com.cloudcomputing.khubox.service.GroupService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin("*")
@RequestMapping("/groups")
@Controller
@RequiredArgsConstructor
public class GroupController {

	private final GroupService groupService;
	private final AuthService authService;
	private final FileService fileService;

	@GetMapping("")
	public ResponseEntity<?> getGroups(HttpServletRequest request) {
		try {
			String loginId = (String) request.getSession().getAttribute("id");
			Member member = authService.findMemberByLoginId(loginId);

			if (member != null) {
				List<Group> groups = groupService.getGroupsWithMember(member.getId());

				ObjectMapper objectMapper = new ObjectMapper();
				String groupsJson = objectMapper.writeValueAsString(groups);

				return ResponseEntity.ok(groupsJson);
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
			}
		} catch (JsonProcessingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during processing");
		}
	}

	@GetMapping("/makegroup")
	public String makeGroup(){
		return "groups/makegroup";
	}

	@PostMapping("/makegroup")
	public ResponseEntity<String> makeGroups(@RequestParam("groupName") String groupName, HttpServletRequest request) {
		Group group = new Group();
		String loginId = (String) request.getSession().getAttribute("id");
		List<Member> list = new ArrayList<>();
		list.add(authService.findMemberByLoginId(loginId));

		group.setName(groupName);
		group.setOwner(loginId);
		group.setGroupMembers(list);

		groupService.createGroup(group);
		fileService.makeBucketDirectory(groupName);

		return ResponseEntity.ok("Group created successfully");
	}


	@GetMapping("/{groupName}")
	public ResponseEntity<?> showGroupMembers(@PathVariable("groupName") String groupName) {
		List<String> fileKeys = fileService.listBucketContents(groupName);
		Map<String, Object> response = new HashMap<>();
		response.put("groupName", groupName);
		response.put("fileKeys", fileKeys);

		return ResponseEntity.ok(response);
	}


	@GetMapping("/{groupName}/upload")
	public String showUploadForm(@PathVariable String groupName, Model model) {
		model.addAttribute("groupName", groupName);
		return "groups/upload";
	}


	@PostMapping("/{groupName}/upload")
	public ResponseEntity<String> uploadFile(@PathVariable String groupName, @RequestParam("file") MultipartFile file) {

		fileService.uploadToAWS(groupName, file);
		log.info("upload File={}", file);

		String message = "File uploaded successfully to group: " + groupName;
		return ResponseEntity.ok(message);
	}


	@GetMapping("/{groupName}/download")
	public ResponseEntity<?> downloadFile(@PathVariable("groupName") String groupName,
	                                      @RequestParam("fileKey") String fileKey,
	                                      HttpServletRequest request,
	                                      HttpServletResponse response) {
		log.info("Download File: groupName={}, fileKey={}", groupName, fileKey);

		// 파일 다운로드 로직 추가
		fileService.download(fileKey, fileKey, request, response);

		// 다운로드 성공 시 응답 생성
		return ResponseEntity.ok("File downloaded successfully");
	}

	@GetMapping("/{groupName}/getmembers")
	public ResponseEntity<?> getMembers(@PathVariable String groupName) {
		// Logic to retrieve members for the given group
		List<String> members = groupService.getMemberNamesByGroupName(groupName);

		// 리턴할 JSON 데이터 생성
		Map<String, Object> response = new HashMap<>();
		response.put("groupName", groupName);
		response.put("members", members);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{groupName}/addmember")
	public String showAddMemberForm(@PathVariable String groupName, Model model) {
		model.addAttribute("groupName", groupName);
		return "/groups/addmember";
	}

	@PostMapping("/{groupName}/addmember")
	public ResponseEntity<String> addMemberToGroup(@PathVariable String groupName, @RequestParam("memberId") String memberId) {
		// 멤버 추가 로직 수행
		groupService.addMember(groupName, memberId);

		return ResponseEntity.ok("Member added successfully");

	}

}
