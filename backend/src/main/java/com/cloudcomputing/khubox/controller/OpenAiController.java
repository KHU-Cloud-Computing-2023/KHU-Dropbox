package com.cloudcomputing.khubox.controller;


import java.io.IOException;
import java.util.List;

import com.cloudcomputing.khubox.domain.Message;
import com.cloudcomputing.khubox.domain.OpenAiRequest;
import com.cloudcomputing.khubox.domain.OpenAiResponse;
import com.cloudcomputing.khubox.service.GroupService;
import com.cloudcomputing.khubox.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class OpenAiController {

	private final OpenAiService openAiService;

	@PostMapping("/chat")
	public OpenAiResponse chat(@RequestParam("prompt") String prompt) {
		return openAiService.getOpenAiResponse(prompt);
	}

	@PostMapping("summarize")
	public OpenAiResponse summarize(MultipartFile file) throws IOException {
		return openAiService.summarize(file);
	}
}
