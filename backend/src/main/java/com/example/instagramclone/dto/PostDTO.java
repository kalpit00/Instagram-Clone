package com.example.instagramclone.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostDTO {
    private Long id;
    private String imageUrl;
    private String caption;
    private LocalDateTime createdAt;
    private UserDTO user;
    private int likesCount;
    private int commentsCount;
    private boolean likedByCurrentUser;
    private List<CommentDTO> comments;
    
    // Constructors
    public PostDTO() {
    }
    
    public PostDTO(Long id, String imageUrl, String caption, LocalDateTime createdAt, UserDTO user, 
                  int likesCount, int commentsCount, boolean likedByCurrentUser, List<CommentDTO> comments) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.caption = caption;
        this.createdAt = createdAt;
        this.user = user;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.likedByCurrentUser = likedByCurrentUser;
        this.comments = comments;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public String getCaption() {
        return caption;
    }
    
    public void setCaption(String caption) {
        this.caption = caption;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public UserDTO getUser() {
        return user;
    }
    
    public void setUser(UserDTO user) {
        this.user = user;
    }
    
    public int getLikesCount() {
        return likesCount;
    }
    
    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }
    
    public int getCommentsCount() {
        return commentsCount;
    }
    
    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }
    
    public boolean isLikedByCurrentUser() {
        return likedByCurrentUser;
    }
    
    public void setLikedByCurrentUser(boolean likedByCurrentUser) {
        this.likedByCurrentUser = likedByCurrentUser;
    }
    
    public List<CommentDTO> getComments() {
        return comments;
    }
    
    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }
}
