package com.sena.riap.service.impl;

import com.sena.riap.entities.Program;
import com.sena.riap.repository.ProgramRepository;
import com.sena.riap.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProgramServiceImpl implements ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    @Override
    public List<Program> getProgram() {
        return programRepository.findAll();
    }

    @Override
    public Program saveProgram(Program program) {
        return programRepository.save(program);
    }

    @Override
    public Program getProgramById(Long id) {
        return programRepository.findById(id).orElse(null);
    }

    @Override
    public Program updateProgram(Long id, Program program) {
        Program oldProgram = programRepository.findById(id).orElse(null);
        if (oldProgram != null){
            oldProgram.setName(program.getName());
            return programRepository.save(oldProgram);
        }
        return null;
    }

    @Override
    public void deleteProgram(Long id) {
        programRepository.deleteById(id);
    }
}
