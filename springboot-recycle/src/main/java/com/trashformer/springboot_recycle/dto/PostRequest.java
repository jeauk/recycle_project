package com.trashformer.springboot_recycle.dto;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String content;
    private String videoLink;
    private List<String> steps;
    private MultipartFile image;
    private List<MultipartFile> stepImages;
}
