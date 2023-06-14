package com.cloudcomputing.khubox.service;

import com.cloudcomputing.khubox.domain.Message;
import com.cloudcomputing.khubox.domain.OpenAiRequest;
import com.cloudcomputing.khubox.domain.OpenAiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OpenAiService {

	@Autowired
	private RestTemplate restTemplate;
	@Value("${openai.model}")
	private String model;
	@Value("${openai.max-completions}")
	private int maxCompletions;
	@Value("${openai.temperature}")
	private double temperature;
	@Value("${openai.max_tokens}")
	private int maxTokens;
	@Value("${openai.api.url}")
	private String apiUrl;

	public OpenAiResponse getOpenAiResponse(String prompt) {
		OpenAiRequest request = new OpenAiRequest(model,
				List.of(new Message("user", prompt)),
				maxCompletions,
				temperature,
				maxTokens);
		OpenAiResponse response = restTemplate.postForObject(apiUrl, request, OpenAiResponse.class);
		return response;
	}


	public String readPdf(MultipartFile file) throws IOException {
		PDDocument document = PDDocument.load(file.getInputStream());
		PDFTextStripper stripper = new PDFTextStripper();
		String extractedText = stripper.getText(document);
		document.close();
		log.info("text={}", extractedText);

		return extractedText;
	}


	public OpenAiResponse summarize(MultipartFile file) throws IOException {
		String text = readPdf(file);

		OpenAiRequest request = new OpenAiRequest(model,
				List.of(new Message("user", "Briefly explain what the following topic is about in 50 words.\n" + text)),
				maxCompletions,
				temperature,
				maxTokens);
		OpenAiResponse response = restTemplate.postForObject(apiUrl, request, OpenAiResponse.class);
		return response;
	}

	public OpenAiResponse translate(MultipartFile file) throws IOException {
		String text = readPdf(file);

		OpenAiRequest request = new OpenAiRequest(model,
				List.of(new Message("user", "translate the following sentences into Korean.\n" + text)),
				maxCompletions,
				temperature,
				maxTokens);
		OpenAiResponse response = restTemplate.postForObject(apiUrl, request, OpenAiResponse.class);
		return response;
	}

	public OpenAiResponse custom(MultipartFile file, String promp) throws IOException {
		String text = readPdf(file);

		OpenAiRequest request = new OpenAiRequest(model,
				List.of(new Message("user", promp + "\n" + text)),
				maxCompletions,
				temperature,
				maxTokens);
		OpenAiResponse response = restTemplate.postForObject(apiUrl, request, OpenAiResponse.class);
		return response;
	}

//	public String gpt3Completion(String prompt) throws OpenAIException, IOException {
//		String apiKey = getOpenAIKey();
//		OpenAI.apiKey = apiKey;
//
//		CompletionResponse response = OpenAI.complete(prompt)
//				.setEngine("text-davinci-003")
//				.setTemperature(0.5)
//				.setTopP(0.3)
//				.setMaxTokens(1000)
//				.execute();
//
//		return response.getChoices().get(0).getText().trim();
//	}
//
//	public String summarize(String document) throws OpenAIException, IOException {
//		List<String> chunks = splitText(document, 5000);
//		List<String> summaries = new ArrayList<>();
//
//		for (String chunk : chunks) {
//			String prompt = "Please summarize the following document:\n" + chunk;
//			String summary = gpt3Completion(prompt);
//
//			if (!summary.startsWith("GPT-3 error:")) {
//				summaries.add(summary);
//			}
//		}
//
//		return String.join("", summaries);
//	}
//
//	public String processPdf(String filename) throws IOException, OpenAIException {
//		String document = readPdf(filename);
//		return summarize(document);
//	}
}
