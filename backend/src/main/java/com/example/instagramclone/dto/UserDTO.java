package com.example.instagramclone.dto;

public class UserDTO {
    private Long id;
    private String username;
    private String fullName;
    private String bio;
    private String profilePicture;
    
    // Constructors
    public UserDTO() {
    }
    
    public UserDTO(Long id, String username, String fullName, String bio, String profilePicture) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.bio = bio;
        this.profilePicture = profilePicture;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getBio() {
        return bio;
    }
    
    public void setBio(String bio) {
        this.bio = bio;
    }
    
    public String getProfilePicture() {
        return profilePicture;
    }
    
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
