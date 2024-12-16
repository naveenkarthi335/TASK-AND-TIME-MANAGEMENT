package com.example.taskmaster.backend.controller;

import com.example.taskmaster.backend.model.Profile;
import com.example.taskmaster.backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public List<Profile> getAllProfiles() {
        return profileService.getAllProfiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long id) {
        Optional<Profile> profile = profileService.getProfileById(id);
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {
        return profileService.saveProfile(profile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @RequestBody Profile updatedProfile) {
        Optional<Profile> existingProfile = profileService.getProfileById(id);
        if (existingProfile.isPresent()) {
            Profile profile = existingProfile.get();
            profile.setPhoneNumber(updatedProfile.getPhoneNumber());
            profile.setAddress(updatedProfile.getAddress());
            profile.setUser(updatedProfile.getUser());
            return ResponseEntity.ok(profileService.saveProfile(profile));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        Optional<Profile> profile = profileService.getProfileById(id);
        if (profile.isPresent()) {
            profileService.deleteProfile(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
