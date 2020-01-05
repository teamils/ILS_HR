package com.example.demo.Entity.Combobox;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Gender {
    @Id
    @SequenceGenerator(name = "Gender_seq", sequenceName = "Gender_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Gender_seq")
    private Long genderID;
    private String genderName;

    public Long getGenderID() {
        return genderID;
    }

    public void setGenderID(Long genderID) {
        this.genderID = genderID;
    }

    public String getGenderName() {
        return genderName;
    }

    public void setGenderName(String genderName) {
        this.genderName = genderName;
    }
}
