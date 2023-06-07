package com.cloudcomputing.khubox.controller;

import com.cloudcomputing.khubox.domain.Group;
import com.cloudcomputing.khubox.domain.Member;
import com.cloudcomputing.khubox.service.AuthService;
import com.cloudcomputing.khubox.service.FileService;
import com.cloudcomputing.khubox.service.GroupService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

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
	public String getGroups(Model model, HttpServletRequest request) {
		log.info("getGroups");
		String loginId = (String) request.getSession().getAttribute("id");
		Member member = authService.findMemberByLoginId(loginId);

		if (member != null) {
			List<Group> groups = groupService.getGroupsWithMember(member.getId());
			model.addAttribute("groups", groups);
		}
		return "groups/groups";
	}

	@GetMapping("/makegroup")
	public String makeGroup(){
		return "groups/makegroup";
	}

	@PostMapping("/makegroup")
	public String makegroups(@RequestParam("groupName") String groupName, HttpServletRequest request){

		Group group = new Group();
		String loginId = (String) request.getSession().getAttribute("id");
		List<Member> list = new ArrayList<>();
		list.add(authService.findMemberByLoginId(loginId));

		group.setName(groupName);
		group.setOwner(loginId);
		group.setGroupMembers(list);

		groupService.createGroup(group);
		fileService.makeBucketDirectory(groupName);

		return "redirect:/groups";
	}


	@GetMapping("/{groupName}")
	public String showGroupMembers(@PathVariable("groupName") String groupName, Model model) {
		List<String> fileKeys = fileService.listBucketContents(groupName);
		model.addAttribute("groupName", groupName);
		model.addAttribute("fileKeys", fileKeys);

		return "groups/files"; // Thymeleaf template name for displaying group members
	}

	@GetMapping("/{groupName}/upload")
	public String showUploadForm(@PathVariable String groupName, Model model) {
		model.addAttribute("groupName", groupName);
		return "groups/upload";
	}


	@PostMapping("/{groupName}/upload")
	public String uploadFile(@PathVariable String groupName, @RequestParam("file") MultipartFile file){
		fileService.uploadToAWS(groupName, file);
		log.info("upload File={}", file);
		return "redirect:/groups/" + groupName;
	}

	@GetMapping("/{groupName}/download")
	public String downloadFile(@PathVariable("groupName") String groupName,
							   @RequestParam("fileKey") String fileKey,
							   HttpServletRequest request,
							   HttpServletResponse response
	) {
		log.info("Download File: groupName={}, fileKey={}", groupName, fileKey);
		// 파일 다운로드 로직 추가
		fileService.download(fileKey, fileKey, request, response);
		return "redirect:/groups/" + groupName + "/files";
	}

	@GetMapping("/{groupName}/getmembers")
	public String getMembers(@PathVariable String groupName, Model model) {
		// Logic to retrieve members for the given group
		List<String> members = groupService.getMemberNamesByGroupName(groupName);

		model.addAttribute("members", members);
		return "/groups/getmembers";
	}

	@GetMapping("/{groupName}/addmember")
	public String showAddMemberForm(@PathVariable String groupName, Model model) {
		model.addAttribute("groupName", groupName);
		return "/groups/addmember";
	}

	@PostMapping("/{groupName}/addmember")
	public String addMemberToGroup(@PathVariable String groupName, @RequestParam("memberId") String memberId) {
		groupService.addMember(groupName, memberId);

		return "redirect:/groups/" + groupName;
	}
}