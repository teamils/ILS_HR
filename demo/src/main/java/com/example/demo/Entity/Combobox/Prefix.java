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
public class Prefix {
    @Id
    @SequenceGenerator(name = "Prefix_seq", sequenceName = "Prefix_seq",initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Prefix_seq")
    private Long prefixID;
    private String prefixName;

    public Long getPrefixID() {
        return prefixID;
    }

    public void setPrefixID(Long prefixID) {
        this.prefixID = prefixID;
    }

    public String getPrefixName() {
        return prefixName;
    }

    public void setPrefixName(String prefixName) {
        this.prefixName = prefixName;
    }
}
